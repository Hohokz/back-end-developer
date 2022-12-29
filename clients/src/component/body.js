import Timer from './timer';

function Body() {

    const data = {
        data: 'images/ic-wash.svg'
    }

    return (
        <div className="flex box-border justify-center bg-sky-300 ">
            <div className=" box-border w-[50em] h-[40em] flex-col flex content-center justify-center bg-white rounded-t-[15px] shadow-[0_-5px_10px_rgba(0,0,0,0.07)]">
                <div className="mb-[1em] flex flex-row justify-around">
                    <div className="flex flex-row mx-[20px]">
                        <img src={data.data} alt="Washing-Machine-1" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 1</p>
                            <Timer timerId='1' />
                        </div>

                    </div>
                    <div className="flex">
                        <img src={data.data} alt="Washing-Machine-2" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 2</p>
                            <Timer timerId='2' />
                        </div>
                    </div>
                </div>
                <div className="mt-[1em] flex flex-row justify-around">
                    <div className="flex">
                        <img src={data.data} alt="Washing-Machine-3" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 3</p>
                            <Timer timerId='3' />
                        </div>
                    </div>
                    <div className="flex">
                        <img src={data.data} alt="Washing-Machine-4" width="200px" />
                        <div className="mt-[30px]">
                            <p>Wash Machine 4</p>
                            <Timer timerId='4' />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Body;