const theme = {
    global : {
        colors: {
           
            lighter:'#788ABA',
            wetSand: '#c5b58c',
            mutePurple: '#6856A9',
            muteTeal: '#5697A9',
            teal: '#4CDBC4', 
            teal2: '#29CBB1',
            algae: '#c3f1c0',
            carrot: '#DB8C24',
            cerulean: '#2473DB',
            oldGold: '#C2A83E',
            paleGreen: '#E0EEC6',
            darkGreen: '#243E36',
            mint: '#F1F7ED',

            microRed: '#EE221F',
            microPink: '#FBD3D3',
            microMaroon: '#840202',
            microBlack: '#000100'


            

            
            

        },
        
        },
    button: {
            default: {
                background: 'mint'
            },
            primary: {
                background: 'teal',
                color: 'black'
                
            },
            secondary: {
                background:'muteTeal',
                color: 'white'
            }
    },
    fileInput: {
        background: 'carrot',
        border: {color: 'black', style: 'double'},
        hover: {
            border: { color:'white'}
        },
        message: {
            color:'beige'
        },
        round: 'none'
        
        
    },
    menu:{
        background: 'white',
        icons: {
            color:'white'
        },
        item: {
            //color: 'white'
        },
        extend: 'border: 2px double black'
    },
    tab: {
        active: {
            background: 'yellow',
            color: 'black'
        },
        background: 'microPink',
        color: 'black',
    
        hover: {
            background: 'yellow'
        }
    },

    tabs: {
        background: 'microRed',
        color: 'white',
        
    }
}

export default theme