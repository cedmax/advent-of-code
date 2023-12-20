const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `broadcaster -> a
// %a -> inv, con
// &inv -> b
// %b -> con
// &con -> output`.split("\n");

class System {
  constructor(circuits) {
    this.circuits = circuits;
    Object.values(this.circuits).forEach((circuit) => {
      if (circuit.type === "&") {
        Object.values(this.circuits)
          .filter((c) => c.dest?.includes(circuit.name))
          .forEach(({ name }) => {
            circuit.state = {
              ...circuit.state,
              [name]: false
            };
          });
      }
    });
  }
  getState() {
    return Object.entries(this.circuits).reduce(
      (acc, [key, circuit]) => ({
        ...acc,
        [key]: circuit.getState()
      }),
      {}
    );
  }

  exec(circuit, ...args) {
    if (!this.circuits[circuit]) return [];
    return this.circuits[circuit].exec(...args);
  }
}

class Circuit {
  constructor({ label, type, dest, state }, exec, getState) {
    this.name = label;
    this.type = type;
    this.dest = dest;
    this.state = state;
    this.exec = exec.bind(this);
    if (getState) {
      this.getState = getState.bind(this);
    }
  }

  getState() {
    return this.state;
  }
}

const types = {
  init: (label, dest) =>
    new Circuit({ label, dest }, function (pulse) {
      return this.dest.map((a) => [pulse, a]);
    }),
  "%": (label, dest) =>
    new Circuit({ label, dest, type: "%", state: false }, function (isHigh) {
      if (!isHigh) {
        this.state = !this.state;
        return this.dest.map((a) => [this.state, a]);
      }
    }),
  "&": (label, dest) =>
    new Circuit({ label, dest, type: "&", state: {} }, function (isHigh, sender) {
      this.state[sender] = isHigh;
      return this.dest.map((a) => [!Object.values(this.state).every((a) => a), a]);
    })
};

const createSystem = (input) => {
  const systemDef = input.reduce((acc, line) => {
    const [keyDef, dest] = line.split(" -> ");
    let key = "broadcaster";
    let type = "init";

    if (keyDef !== "broadcaster") {
      type = keyDef.charAt(0);
      key = keyDef.substr(1);
    }

    acc[key] = types[type](key, dest.split(", "));

    return acc;
  }, {});
  systemDef.output = new Circuit({ label: "output" }, () => []);

  return new System(systemDef);
};

const action = (system, originalState, pulses, count = 1) => {
  let queue = [[false, "broadcaster"]];
  let next;
  pulses.push(false);

  do {
    [pulse, next, current] = queue.shift();

    const addToQueue = system.exec(next, pulse, current);

    if (addToQueue) {
      pulses.push(...addToQueue.map((a) => a[0]));
      queue = [...queue, ...addToQueue.map((a) => [...a, next])];
    }
  } while (queue.length);

  if (count < 1000 && JSON.stringify(system.getState()) !== JSON.stringify(originalState)) {
    count++;
    const res = action(system, originalState, pulses, count);
    pulses = res.pulses;
    count = res.count;
  }

  return {
    pulses,
    count
  };
};

const getResult = (high, low) => (1000 / count) * high * (1000 / count) * low;

const system = createSystem(input);
const { count, pulses } = action(system, system.getState(), []);
console.log(getResult(pulses.filter((a) => a).length, pulses.filter((a) => !a).length));
