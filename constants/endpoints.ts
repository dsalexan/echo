import { ENV } from './env'

let _ = {
    api: {
        auth: {
            login: '/api/auth/login'
        },
        mensagens: {
            _: '/api/mensagens',
            novas: '/api/mensagens/novas',
            lidas: '/api/mensagens/lidas'
        },
        grade: {
            _: 'api/grade',
            turmas: {
                _: '/api/grade/turmas/'
            }
        }
    }
}



export default ((urls, hostname) => {
    let change = (nivel) => {
        if(typeof nivel == 'string'){
            return hostname + nivel
        }else{
            for(let k of nivel){
                nivel[k] = change(nivel[k])
            }

            return nivel
        }
    }

    return change(urls)
    
})(_, ENV.HOSTNAME)