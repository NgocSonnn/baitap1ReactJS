import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";
import Divider from "../Divider";
import './style.scss';



const Task = (props) => {

    const { taskName, isDone, id } = props.task

    const { handleRemoveTask, handeMakeDoneTask } = props


    return <div>
        <div className="task">
            <p className={`task__name ${isDone ? "task__name--done" : ""}`}>{taskName}</p>
            <div className="task__groups-btn">
                <button className="task__btn-done" onClick={() => { handeMakeDoneTask(id) }}> <CheckOutlined /></button>
                <button className="task__btn-del" onClick={() => { handleRemoveTask(id) }}><DeleteOutlined /></button>
            </div>

        </div>
        <Divider></Divider>
    </div>
}
export default Task;