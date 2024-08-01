import {ref} from 'vue'
import type { ICharacter } from './interfaces'



import { useLoader } from '@/composables/useLoader'
const {
    start,
    stop,
} = useLoader()



const characters = ref<ICharacter[]>([])
const totalPages = ref<number[]>([])
const isModal = ref<boolean>(false)


const currentPage = ref<number>(Number(localStorage.getItem('currentPage')) || 1)
const nameFilter = ref<string>(localStorage.getItem('name')! || '')
const statusFilter = ref<string>(localStorage.getItem('status') || 'any')




export const rickApi = () => {
 

    const getCards = async () => {
        start()

        let name = nameFilter.value
        let status = statusFilter.value

        name === '' ? name = '' : name = `name=${name}`
        status === 'any' ? status = '' : status = `status=${status}`
     
        document.body.classList.add('lock')
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage.value}&${name}&${status}`)
        
        if(res.ok){
            const result = await res.json()
            characters.value = result.results

            console.log(result.info.pages)
            await generatePagesArr(result.info.pages)
            
        }else{
            console.log('error:' + res.status)
            characters.value = []
        }

        setTimeout(() => {
            document.body.classList.remove('lock')
            window.scrollTo({ top: 400, behavior: 'smooth' })
            stop()
        }, 1500)   

    }

    const updatePage = async(page:number) => {
        currentPage.value = page
        _setLocalStorageData()
        await getCards()

    }

    const generatePagesArr = async(length:number) => {
        totalPages.value = []
        for (let i = 1; i <= length; i++) {
            totalPages.value.push(i)
          
        }
    }

    const reset = async() => {
        currentPage.value = 1
        nameFilter.value = ''
        statusFilter.value = 'any'
        _setLocalStorageData()
        isModal.value = false
        await getCards()
    }

    const setFilters = async (name:string, status:string) => {
        currentPage.value = 1
        nameFilter.value = name
        statusFilter.value = status
        _setLocalStorageData()
        isModal.value = false
        await getCards()
    }


    const _setLocalStorageData = () => {
        localStorage.setItem('currentPage', currentPage.value.toString())
        localStorage.setItem('name', nameFilter.value)
        localStorage.setItem('status', statusFilter.value)
    }

  



    return {
        getCards, 
        updatePage, 
        characters, 
        totalPages, 
        currentPage,
        reset, 
        setFilters, 
        nameFilter, 
        statusFilter, 
        isModal
    }
}