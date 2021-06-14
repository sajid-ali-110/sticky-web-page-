var colors = ["red","green", "blue", "yellow", "pink","orange","grey", "lightgrey", "lightgreen", "lightblue", "skyblue", "dark", "lightblue","purple","#fffff","#f5deb3","#546377","#ffe4e1",'#e74c3c', '#8e44ad', '#3498db', '#e77e22', '#2ecc71']
var note_id = 0
var starred_note=[]

const show = document.querySelector('.show')

const addBtn= document.querySelector('.add')


addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.setAttribute('id', "note_"+note_id)
    note.setAttribute('draggable',true)
    note.addEventListener('drag',function(e){

        note.style.position="absolute"
        
    })
    note.addEventListener('dragend',function(e){
        var x=e.pageX
        var y=e.pageY
        note.style.left=(x-30)+"px"
        note.style.top=(y-30)+"px"
    })
    show.addEventListener('click',()=>{
        note.classList.remove('hide')
    })
    
    note.innerHTML = `
    <div class="tools">
    <button class="star"><i class="fas fa-star"></i></button>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <hr>
    <div draggable="false" class="main ${text ? "" : "hidden"}"></div>
    <textarea placeholder="Type Your Text Here..." class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const starBtn = note.querySelector('.star')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    starBtn.addEventListener('click',()=>{
    starBtn.style.color='red'
        
    })
    function display(){
        setTimeout(()=>{
            note.classList.add('hide')
        },1000000000)
      }
      display()
      fav.addEventListener('click',()=>{
        if(note.classList.contains='hide'){
            note.classList.remove('hide')
      
        }else{
            note.classList.add('hide')
      
        }
      })
      fav.addEventListener('click',()=>{
          if(starBtn.style.color!='yellow'){
              note.classList.add('hide')
          }
      })

    note.style.backgroundColor =colors[Math.floor(Math.random()*colors.length)]
    // let color='#';
    // color+=Math.random().toString(16).slice(2, 8)
    // note.style.backgroundColor = color

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}
