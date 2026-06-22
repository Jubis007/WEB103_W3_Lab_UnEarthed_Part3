import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import './Gifts.css'

const Gifts = (props) => {
    // 1. Keep track of the original data array
    const [gifts, setGifts] = useState([])
    
    // 2. Create new state variables for our search and filter inputs
    const [searchQuery, setSearchQuery] = useState('')
    const [audienceFilter, setAudienceFilter] = useState('')

    // Load the data from App.jsx into state when the component mounts
    useEffect(() => {
        if (props.data) {
            setGifts(props.data)
        }
    }, [props.data])

    // 3. Filter the gifts array based on both inputs
    const filteredGifts = gifts.filter((gift) => {
        // Check if the gift name includes the search text (case-insensitive)
        const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase())
        // Check if the audience matches the dropdown (or if the dropdown is empty)
        const matchesAudience = audienceFilter === '' || gift.audience === audienceFilter
        
        // Only keep the gift if it matches BOTH criteria
        return matchesSearch && matchesAudience
    })

    return (
        <div className="gifts-page">
            {/* The Search & Filter Control Bar */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
                <input 
                    type="text" 
                    placeholder="Search for a gift..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                
                <select 
                    value={audienceFilter} 
                    onChange={(e) => setAudienceFilter(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">All Audiences</option>
                    <option value="Gamers">Gamers</option>
                    <option value="Green Thumbs">Green Thumbs</option>
                    <option value="Candle Lovers">Candle Lovers</option>
                    <option value="Sneakerheads">Sneakerheads</option>
                    <option value="Music Lovers">Music Lovers</option>
                </select>
            </div>

            {/* The Main Grid (Mapping over filteredGifts instead of gifts) */}
            <main className="gifts-container">
                {filteredGifts && filteredGifts.length > 0 ? (
                    filteredGifts.map((gift) => (
                        <Card 
                            key={gift.id} 
                            id={gift.id} 
                            name={gift.name} 
                            pricepoint={gift.pricepoint} 
                            audience={gift.audience} 
                            image={gift.image} 
                        />
                    ))
                ) : (
                    <h3 style={{ textAlign: 'center', width: '100%' }}>No Gifts Match Your Search 😞</h3>
                )}
            </main>
        </div>
    )
}

export default Gifts