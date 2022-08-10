// import mockData from './dataMock.js'
import store from './storeMock.js'
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
class FieldOperator{
    constructor(value){
        this.value = value
    }
    operateField(){}
}
class Incrementor extends FieldOperator{
    constructor(value){
        super(value)
    }
    operateField(paths, field){
        const currentValue = store.getState([...paths, field])
        if(currentValue){
            return this.value + currentValue
        }else{
            return this.value
        }
    }
}
class ArrayUnioner extends FieldOperator{
    constructor(value){
        super(value)
    }
    operateField(paths, field){
        const currentValue = store.getState([...paths, field])
        if(currentValue){
            return [...new Set([...currentValue, this.value])]
        }else{
            return this.value
        }
    }
}
class ArrayRemover extends FieldOperator{
    constructor(value){
        super(value)
    }
    operateField(paths, field){
        const currentValue = store.getState([...paths, field])
        if(currentValue){
            return currentValue.filter(v => !isEqual(v, this.value))
        }else{
            return this.value
        }
    }
}

class QueryOperator{
    runQuery(){
        return true
    }
}

class WhereOperator extends QueryOperator{
    constructor(field, operator, value){
        super()
        this.operator = operator
        this.value = value
        this.field = field
    }

    runQuery(data){
        return true
    }
}

class Query{
    constructor(ref, queries){
        this.ref = ref
        this.queries = queries
    }
}

export const arrayRemove = jest.fn(v => new ArrayRemover(v));
export const arrayUnion = jest.fn(v => new ArrayUnioner(v));
export const increment = jest.fn(v => new Incrementor(v));

export const getFirestore = jest.fn();
export const where = jest.fn((field, operator, value) => {
    return new WhereOperator(field, operator, value)
});
export const limit = jest.fn();
export const orderBy = jest.fn();
export const startAfter = jest.fn();
export const doc = jest.fn((...args) => {
    args.shift();
    return args;
});
export const FieldPath = jest.fn();
export const endBefore = jest.fn();
export const collection = jest.fn((...args) => {
    args.shift();
    return args;
});
export const query = jest.fn((...args) => {
    const ref = args.shift()
    return new Query([...ref], args)
});
export const updateDoc = jest.fn((paths, value) => {
    Object.keys(value).forEach(key => {
        if(value[key] instanceof FieldOperator){
            value[key] = value[key].operateField(paths, key)
        }
    })
    store.setState(paths, value, true)
});

export const getDoc = jest.fn((ref) => {
    const data = store.getState(ref)
    if(data){
        return Promise.resolve({
            exists(){
                return true
            },
            id: ref[ref.length - 1],
            data(){
                return data
            },
            ref: ref
        })
    }else{
        return Promise.resolve({
            exists(){
                return false
            },
            id: null
        })
    }
});
export const getDocs = jest.fn((ref) => {
    let queries = null
    if(ref instanceof Query){
        queries = ref.queries
        ref = ref.ref
    }
    const data = store.getState(ref)
    if(data){
        const docs = Object.keys(data).reduce((acc, key) => {
            // if(!isNil(queries)){
            //     const queryIncluded = queries.map(v => v.runQuery(data[key])).reduce((acc, v) => acc && v, [])
            //     if(queryIncluded){
            //         acc.push({
            //             data(){
            //                 return data[key]
            //             },
            //             id: key,
            //             ref: [...ref, key]
            //         })
            //     }
            // }else{
                acc.push({
                    data(){
                        return data[key]
                    },
                    id: key,
                    ref: [...ref, key]
                })
            // }
            return acc
        }, [])
        return Promise.resolve({
            exists(){
                return true
            },
            empty: false,
            docs
        })
    }else{
        return Promise.resolve({
            exists(){
                return false
            },
            empty: true,
        })
    }
});

export const onSnapshot = jest.fn();
export const addDoc = jest.fn((refs, data) => {
    const randId = (Math.random() + 1).toString(36).substring(7)
    refs.push(randId)
    store.setState(refs, data)
    return refs
});
export const deleteDoc = jest.fn((paths) => {
    store.deleteState(paths)
});
export const setDoc = jest.fn((paths, value) => {
    Object.keys(value).forEach(key => {
        if(value[key] instanceof FieldOperator){
            value[key] = value[key].operateField(paths, key)
        }
    })
    store.setState(paths, value, false)
});

export const runTransaction = jest.fn((db, fn) => {
    const trans = {
        update: (...args) => {
            updateDoc(...args)
        },
        set: (...args) => {
            setDoc(...args)
        }
    }
    store.lock()
    const runFunc = () => {
        store.unlock()
        fn(trans)
    }
    return Promise.resolve(runFunc())
})
class BatchWriter{
    constructor(){
        this.updates = []
        store.lock()
    }

    update(paths, value){
        this.updates.push({func: updateDoc, paths, value})
    }

    commit(){
        store.unlock()
        const results = this.updates.map(caller => {
            return caller.func(caller.paths, caller.value)
        })
        return Promise.resolve(results)
    }
}
export const writeBatch = jest.fn(() => {
    return new BatchWriter()
});