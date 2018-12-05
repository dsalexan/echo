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
            _: '/api/grade',
            turmas: '/api/grade/turmas',
            eventos: '/api/grade/eventos'
        },
        alunos: {
            _: '/api/alunos'
        },
        utilidades: {
            saldo: '/api/utilidades/saldo'
        },
        caronas: {
            _: '/api/caronas',
            localidades: '/api/caronas/localidades'
        }
    },
    bug: {
        report: '/bug/report'
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