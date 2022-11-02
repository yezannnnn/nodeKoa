export function getConfig(env) {
    const actList = {  
		actId: env === 'prod' ? '1' : '1',          
    }
    const config = {
        actList: actList,
    }
    return config
}