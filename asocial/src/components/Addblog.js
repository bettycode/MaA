import React from 'react'

function Addblog() {
  return (
    <div>
       <form  onSubmit={handleFormSubmit }>
                        <div className="form-group">
                            <input type="text" 
                            className="form-control" 
                            // value={}
                            // onChange={(e) =>setFormObject(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text" 
                            className ="form-control"
                            value={ blogs}
                            // onChange={(e) =>setFormObject(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control"  
                            rows="5"
                            type="text"
                            // onChange={(e) =>setFormObject(e.target.value)}
                            value={blogs}
                            ></textarea>
                        </div>
                        <button
                        style={{ height: "0",
                            width: "0",
                            backgroundColor: "transparent",
                            color: "transparent",
                            border: "none"}}
                       
                        type="submit">hidden </button> 
                    </form>
    </div>
  )
}

export default  Addblog

