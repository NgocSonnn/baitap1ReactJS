import { PlusCircleOutlined } from "@ant-design/icons";
import Divider from "../Divider";
import Input from "antd/es/input/Input";
import React, { useState } from "react";
import './style.scss';

const FormInputTask = (props) => {

    const [inputTaskName, setInputTaskName] = useState("")

    const { handleAddTask } = props

    const handleChangeTaskName = (event) => {
        setInputTaskName(event.target.value)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()
        if (!inputTaskName) return
        handleAddTask(inputTaskName)
        setInputTaskName("")
    }

    return (
        <>
            <div className=" todo-list-header">
                <h2 className="todo-list-header__title">to do list application</h2>
                <form className="todo-list-header__form" onSubmit={handleSubmitForm}>
                    <Input size="large"
                        placeholder="please input task name"
                        value={inputTaskName}
                        onChange={handleChangeTaskName} />
                    <button className="todo-list-header__btn-add-task" type="submit">
                        <PlusCircleOutlined style={{ fontSize: '30px' }} /></button>
                </form>
                <Divider></Divider>
            </div>
        </>
    )
}

export default FormInputTask;