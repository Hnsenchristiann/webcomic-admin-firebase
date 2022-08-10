import data from './dataMock.js'
import cloneDeep from 'lodash/cloneDeep'

export class Store{
    constructor(initState = null){
        const state = initState || {}
        this.initState = cloneDeep(state)
        this.state = cloneDeep(state)
        this.locked = false
    }

    lock(){
        this.locked = true
    }

    unlock(){
        this.locked = false
    }

    resetState(){
        this.state = cloneDeep(this.initState)
    }

    getState(paths){
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length; i++){
            if(data[paths[i]]){
                data = data[paths[i]]
            }else{
                return null
            }
        }
        return data;
    }

    setState(paths, value, merge = false){
        if(this.locked) return
        if(!this.state[paths[0]]){
            this.state[paths[0]] = {}
        }
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length - 1; i++){
            if(!data[paths[i]]){
                data[paths[i]] = {}
            }
            data = data[paths[i]]
        }
        if(merge && typeof value == 'object' && !Array.isArray(value)){
            data[paths[paths.length - 1]] = {
                ...data[paths[paths.length - 1]], 
                ...value
            }
        }else{
            data[paths[paths.length - 1]] = value
        }
    }

    deleteState(paths){
        if(this.locked) return
        let data = this.state[paths[0]]
        for(let i = 1; i < paths.length - 1; i++){
            if(data[paths[i]]){
                data = data[paths[i]]
            }else{
                return
            }
        }
        delete data[paths[paths.length - 1]]
    }
}

export default new Store(data);