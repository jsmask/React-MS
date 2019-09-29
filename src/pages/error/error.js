import React, { Fragment } from 'react';
import '@less/error.less';


function Error(props) {


    const createStar = (num, type) => {
        let arr=[];

        for (let i = 0; i < num; i++) {
            arr.push(<div key={`${type}-${i}`} className={type}></div>)  
        }

        return arr;
    }

    const createBird=(num)=>{
        let arr=[];

        for (let i = 0; i < num; i++) {
            arr.push(
                <div key={`bird-${i}`} className="bird bird-anim">
                    <div className="bird-container">
                        <div className="wing wing-left">
                            <div className="wing-left-top"></div>
                        </div>
                        <div className="wing wing-right">
                            <div className="wing-right-top"></div>
                        </div>
                    </div>
                </div>
            )  
        }

        return arr;
    }

    const goBack = () => {
        props.history.replace('/');
    }


    return (
        <Fragment>

            <div className="container container-star">
                {
                    createStar(30, "star-1")
                }

                {
                    createStar(30, "star-2")
                }
            </div>

            <div className="container container-bird">
            
                {
                    createBird(6)
                }

                <div className="container-title">
                    <div className="title">
                        <div className="number">4</div>
                        <div className="moon">
                            <div className="face">
                                <div className="mouth"></div>
                                <div className="eyes">
                                    <div className="eye-left"></div>
                                    <div className="eye-right"></div>
                                </div>
                            </div>
                        </div>
                        <div className="number">4</div>
                    </div>
                    <div className="subtitle">Not Found. . . </div>
                    <button onClick={goBack}>Back</button>
                </div>

            </div>

        </Fragment>
    )
}

export default Error;