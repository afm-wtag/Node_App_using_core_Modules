// argv
console.log(process.argv)
console.log(process.argv[3]); // node processDemo.js mumu nafi -> nafi

// process env
console.log(process.env.LOGNAME)

// process pid
console.log(process.pid)

// process cwd()
console.log(process.cwd())

// process title
console.log(process.title)

// process memoryUsage()
console.log(process.memoryUsage())

// process uptime()
console.log(process.uptime())

// process exit()
process.on('exit',(code)=>{console.log(`About to exit with code: ${code}`)})
process.exit(0)

console.log('Hello World')