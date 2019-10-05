import { useState } from 'react'
import useToggle from './useToggle'

function useBookDetailModal() {
    const [modalState, toggler] = useToggle();
    const [bookInModal, changeBookInModal] = useState(null)
    return [toggler, modalState, changeBookInModal, bookInModal]
}

export default useBookDetailModal;