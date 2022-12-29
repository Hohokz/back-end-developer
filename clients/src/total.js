import axios from "axios";
import { useState } from "react";

function Total() {

    const [totalData, setTotalData] = useState([])

    const getPosts = async () => {
        const results = await axios.get(
            `http://localhost:4000/wash`
        );
        setTotalData(results.data.data)
        console.log(totalData)
    }

    return (

        <div>
            <button onClick={getPosts}>ตรวจสอบรายได้</button>

            {
                totalData.map(item => (
                    <div key={item.id}>
                        <p>เครื่องหมายเลข : {item.washing_id}  </p>
                        <p>รายได้ :{item.total} </p>
                    </div>
                ))
            }
        </div>
    )

}

export default Total;