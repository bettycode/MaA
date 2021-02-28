import React from 'react'

function Widget() {
    return (
        <>
         <div className="widgets" style={{paddingLeft: "1rem", marginTop: "2rem"}}>
        <iframe 
        width="90%" 
        height="315" 
        scrolling="no"
        allowTransparency="true"
        src="https://www.youtube.com/embed/2wKhEEmgzb4" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen>

         </iframe>
        </div>
        <div className="widgets" style={{paddingLeft: "1rem", marginTop: "2rem"}}>
            <iframe src="https://www.youtube.com/embed/_wmWjvAJGsg" 
            width="90%" 
            height="315" 
            frameborder="0" 
            scrolling="no"
            allowTransparency="true"
            style={{border:"none",overflow:"hidden"}}
            //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen>

             </iframe>
            
        </div>

        <div className="widgets" style={{paddingLeft: "1rem", marginTop: "2rem"}}>
            <iframe
             width="90%" 
             height="315" 
             scrolling="no"
             allowTransparency="true"
             src="https://www.youtube.com/embed/JzrL5Xw6-ss" 
             frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>

              </iframe>

        </div>      

       
        </>
    )
}

export default Widget
