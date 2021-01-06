import React, { ChangeEvent, FormEvent, useState } from 'react'
import Modal from 'react-modal'
import Button from 'components/button/Button'
import TextArea from 'components/fields/text-area/TextArea'
import './campaignImport.scss'

type Props = {
    onImport: (input: string) => void
}

const CampaignImport = ({ onImport }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onImport(value)
    }

    return (
        <>
            <Button onClick={openModal}>Import Campaigns</Button>
            <Modal
                appElement={document.body}
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <form className="campaign-import" onSubmit={handleSubmit}>
                    <TextArea
                        label="Enter Campaign Data"
                        name="message"
                        value={value}
                        onChange={handleChange}
                    />
                    <div className="campaign-import__actions">
                        <Button type="submit">Import</Button>
                        <Button type="button" onClick={closeModal} secondary>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default CampaignImport
