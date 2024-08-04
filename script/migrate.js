const { exec } = require('child_process')

const command = process.argv[2]
const mrigrationName = process.argv[3]

const validCommands = ['create', 'up', 'down', 'list', 'prune']
if (!validCommands.includes(command)) {
    console.error(`Invalid command: ${command}`, `must be one of followng commands ${validCommands}`)
    process.exit(0)
}

const commnadWithoutMigrationNameRequired = ['list', 'prune']
if (!commnadWithoutMigrationNameRequired.includes(command) && !mrigrationName) {
    console.error(`Migration name is required`)
    process.exit(0)
}

function runNpmScrip() {
    return new Promise((resolve, reject) => {
        let execCommand = ``
        if (commnadWithoutMigrationNameRequired.includes(command)) {
            execCommand = `migrate ${command}`
        } else {
            execCommand = `migrate ${command} ${mrigrationName}`
        }

        const childProcess = exec(execCommand, (error, stdout) => {
            if (error) {
                reject(error)
            } else {
                resolve(stdout)
            }
        })
        childProcess.stderr.on('data', (data) => {
            console.error(data)
        })
    })
}

runNpmScrip().then((output) => {
    console.info(output)
})

