import { useEffect, useState } from "react"

export default function TaskList({tasks, removeTask, editTask}) {
    const [priority, setPriority] = useState(false)
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    function handlePriorityFilter() {
        setPriority(prev => !prev)
        console.log("priority : ", priority);
    }

    useEffect(() => {
        setFilteredTasks(tasks)
    }, [tasks])

    useEffect(() => {
        priority ? setFilteredTasks(tasks.filter(item => item.priority === priority)) : setFilteredTasks(tasks)
    }, [priority])

    if (tasks.length === 0) {
        return <></>
    }

    return (
        <>
            <div className="p-3 bg-light my-3 border rounded">
                <ul className="list-group my-3">
                    <li className="list-group-item" aria-current="true">Görevler <span onClick={handlePriorityFilter} className={`btn btn-sm ${!priority ? "btn-primary" : "btn-info"} float-end`}>
                        {!priority ? "Öncelikli Olanları Göster" : "Hepsini Göster" }
                        </span></li>
                    {filteredTasks.map((item) => 
                        <li className="list-group-item" key={item.uuid}>
                            {item.priority && 
                            <span className="badge text-bg-secondary me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-exclamation" viewBox="0 0 16 16">
                            <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"/>
                            </svg></span>}
                            {item.task}
                            <div className="btn-group float-end" role="group">
                                <button className="btn btn-sm btn-info" onClick={() => editTask(item.uuid)}>Düzenle</button>
                                <button className="btn btn-sm btn-danger" onClick={() => removeTask(item.uuid)}>Sil</button>
                            </div>
                        </li>
                        )}
                </ul>
            </div>
        </>
    )
}