import React from "react"
import  { TextArea } from "react-mde"



export default function Editor({ currentNote, updateNote }) {
    

    

    return (
        <section className="pane editor">
            <TextArea
                value={currentNote?.body}
                onChange={updateNote}
                height={50}
                heightUnits="vh"
                className="editor--textarea"
                
                
            />
        </section>
    )
}
