import './App.css'
import Card from "./Card";
import React from 'react'

class Board extends React.Component {
    constructor(props) {
        super(props)
        const fronts = [
            '🥟',
            '🥭',
            '🧁',
            '🍒',
            '🍦',
            '🍌',
            '🍓',
            '🍜',
            '❤️',
            '🍑',
            '🍩',
            '🥥',
            '🌶',
        ]
        const deck = fronts
            .concat(fronts)
            .sort(() => Math.random - 0.5)
            .map(f => {
                return {
                    content: f,
                    faceUp: false
                }
            })
        this.state = {
            deck: deck,
            firstCard: null
        }
    }

    flipCardTo(cardInx, faceUp) {
        this.setState({
            deck: this.state.deck.map((f, i) => {
                if (i === cardInx) {
                    return {
                        content: f.content,
                        faceUp: !f.faceUp,
                    }
                } else {
                    return f;
                }
            })
        })
    }
    flip(cardIdx) {
        if (this.state.firstCard === null) {
            this.setState({firstCard: cardIdx});
        } else {
            const firstCardContent = this.state.deck[this.state.firstCard].content;
            const secondCardContent = this.state.deck[cardIdx].content;
            if (firstCardContent === secondCardContent) {
                this.setState({firstCard: null});
            } else {
                setTimeout(() => {
                    this.flipCardTo(this.state.firstCard, false)
                    this.flipCardTo(cardIdx, false)
                    this.setState({firstCard: null});
                }, 1000)
            }
        }
        this.flipCardTo(cardIdx, !this.state.deck[cardIdx].faceUp)
    }

    render() {
        return (
            this.state.deck.map((f, i) => {
                return (<div className='Board'>
                    <Card
                        flip={() => {
                            this.flip(i)
                        }}
                        content={f.content}
                        faceUp={f.faceUp}/>
                </div>)
            })
        )
    }
}

export default Board;