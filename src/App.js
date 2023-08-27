import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import {addDoc, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "./firebase"

import Split from "react-split"






 



export default function App() {
    
    
    
    const d = new Date()
    const [notes, setNotes] = useState([])
    const [currentNoteId, setCurrentNoteId] = useState("")
    
         useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, snapshot => {
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

        useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])
        
  
console.log(d.toLocaleTimeString())
  

    async function createNewNote() {
            const newNote = {
            
            body: "اكتب ملاحظتك هنا",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            time: [ d.toLocaleDateString(), d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})]
            
        }
       const newNoteRef = await addDoc(notesCollection, newNote)
            
        setCurrentNoteId(newNoteRef.id)
    }
    
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, {body: text, updatedAt: Date.now(), time: [d.toLocaleDateString(), d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})]}, {merge: true})

    }

   
    
    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0]

    const sortedNotes = notes.sort((a,b) => b.updatedAt - a.updatedAt)
    
    async function deleteNote(noteId) {
       const docRef = doc(db, "notes", noteId)
       await deleteDoc(docRef)
        
    }

    console.log(sortedNotes)

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                
                    
                    <Editor 
                        currentNote={currentNote} 
                        updateNote={updateNote} 
                    />
                
            </Split>
            :
            <div className="no-notes">
                <h1>لا يوجد أية ملاحظات</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    أنشئ ملاحظة جديدة
                </button>
            </div>
            
        }
        </main>
    )
}
