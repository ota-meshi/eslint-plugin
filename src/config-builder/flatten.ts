export function* flattenConfig(config: Promise<any>): any {
  for (let index = 0; index < 15; index++) {
    const i = index;
    yield config.then((configs) => configs[i] || {});
  }
}
