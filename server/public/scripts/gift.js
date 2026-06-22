// Define async function to display a single item
const renderGift = async () => {
    // Extract the item ID from the end of the current URL
    const id = parseInt(window.location.href.split('/').pop())
    
    // Fetch the entire array of items from the backend API
    const res = await fetch('/gifts')
    // Parse the API response into a JavaScript array
    const arr = await res.json()

    // Select the main HTML container where the item details will go
    const box = document.getElementById('gift-content')

    // Search the array to find the specific object matching our URL ID
    let obj = arr.find(x => x.id === id)

    // Check if a matching object was actually found
    if (obj) {
        // Update the image source attribute with the object's image URL
        document.getElementById('image').src = obj.image
        // Update the name heading with the object's name
        document.getElementById('name').textContent = obj.name
        // Update the submittedBy paragraph with the object's submitter
        document.getElementById('submittedBy').textContent = 'Submitted by: ' + obj.submittedBy
        // Update the pricePoint paragraph with the object's price
        document.getElementById('pricePoint').textContent = 'Price: ' + obj.pricePoint
        // Update the audience paragraph with the object's intended audience
        document.getElementById('audience').textContent = 'Great For: ' + obj.audience
        // Update the description paragraph with the object's description
        document.getElementById('description').textContent = obj.description
        // Change the browser tab title to include the object's name
        document.title = `UnEarthed - ${obj.name}`
    } else {
        // Create an h2 element for the error message
        const err = document.createElement('h2')
        // Set the text content of the error message
        err.textContent = 'No Gifts Available'
        // Append the error message to the main container
        box.appendChild(err)
    }
}

// Call the function immediately when the script loads
renderGift()