function postAuth({title, description, isDone})
{
    if(title.trim().length === 0 && !isDone) return false
    else return true
}

export { postAuth }