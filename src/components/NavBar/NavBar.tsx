import { PokemonList } from '@/models'
import { getPokemonList } from '@/pages'
import { updatePokemon } from '@/redux/states/pokemon'
import { createPokemonList } from '@/redux/states/pokemonList'
import { AppStore } from '@/redux/store'
import { Autocomplete, TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { alpha, styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ParticleGenerator } from '../ParticleGenerator'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const StyledInputBase = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      width: '15ch!important',
      '&:focus': {
        width: '25ch!important',
      },
    },
  },
}))

const TextFieldStyled = styled(TextField)(() => ({
  color: 'white',
}))

export default function NavBar({ color }: { color: string }) {
  const dispatch = useDispatch()
  const pokemonListState = useSelector((store: AppStore) => store.pokemonList)
  const tryGetPokemonList = async (limit: number) => {
    try {
      const data = await getPokemonList(limit)
      dispatch(createPokemonList(data.results))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    tryGetPokemonList(1200)
  }, [])

  const handleSelectOption = (value: string | null) => {
    if (value) {
      const pokemonObj = pokemonListState.find((pokemon: PokemonList) => pokemon.name === value)
      const pokemonId = pokemonObj?.url.split('/')[6]
      dispatch(updatePokemon({ id: pokemonId }))
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' style={{ backgroundColor: color }}>
        <Toolbar style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 2 }}>
            <ParticleGenerator image={'../src/assets/logo.png'} width={300} height={85} color={'white'} />
          </div>
          <div style={{ flex: 2 }}>
            <Search>
              <StyledInputBase
                id='free-solo-demo'
                options={pokemonListState && pokemonListState.map((pokemon: PokemonList) => pokemon.name)}
                onChange={(event, value) => handleSelectOption(value)}
                renderInput={(params) => (
                  <TextFieldStyled
                    {...params}
                    label='Search…'
                    InputLabelProps={{
                      style: { color: 'white' },
                    }}
                  />
                )}
              />
            </Search>
          </div>
          <div style={{ flex: 2 }}></div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
