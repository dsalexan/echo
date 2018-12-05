import { ENV } from './env'

let _ = {
    api: {
        auth: {
            login: ENV.HOSTNAME + '/api/auth/login'
        },
        mensagens: {
            _: ENV.HOSTNAME + '/api/mensagens',
            novas: ENV.HOSTNAME + '/api/mensagens/novas',
            lidas: ENV.HOSTNAME + '/api/mensagens/lidas'
        },
        grade: {
            _: ENV.HOSTNAME + '/api/grade',
            turmas: ENV.HOSTNAME + '/api/grade/turmas',
            eventos: ENV.HOSTNAME + '/api/grade/eventos'
        },
        alunos: {
            _: ENV.HOSTNAME + '/api/alunos'
        },
        utilidades: {
            saldo: ENV.HOSTNAME + '/api/utilidades/saldo'
        },
        caronas: {
            _: ENV.HOSTNAME + '/api/caronas',
            localidades: ENV.HOSTNAME + '/api/caronas/localidades'
        }
    },
    bug: {
        report: ENV.HOSTNAME + '/bug/report'
    }
}



export default ((urls, hostname) => {
    let change = (nivel) => {
        if(typeof nivel == 'string'){
            console.log(hostname, nivel)
            return hostname + nivel
        }else{
            for(let k of nivel){
                nivel[k] = change(nivel[k])
            }

            return nivel
        }
    }

    let ___  = change(urls)

    return ___
    
})(_, ENV.HOSTNAME)