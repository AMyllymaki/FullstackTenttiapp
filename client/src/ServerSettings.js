

const getEnvironment = () =>
{
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'https://fullstacktenttiapp.azurewebsites.net'
        case 'development':
            return 'http://localhost:4000'
        case 'test':
            return 'http://localhost:4000'
        default:
            return 'http://localhost:4000'
    }
}

const ServerSettings =
{
    baseURL: getEnvironment()
}

export default ServerSettings