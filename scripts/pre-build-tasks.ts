const preBuildTasks: (() => Promise<void>)[] = [];

async function runPreBuildTasks () {
  console.log('-------------------------------------');
  for (const task of preBuildTasks) {
    console.log('Run task:', task.name);
    try {
      await task();
      console.log('-------------------------------------');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

console.log('Run pre-build tasks ...');
runPreBuildTasks().then(() => console.log('Pre-build tasks finished'));
