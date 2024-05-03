import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'
import * as enums from '../../utils/enums/Tarefa'

type ContatosState = {
  itens: Contato[]
}

const initialState: ContatosState = {
  itens: [
    {
      id: 1,
      descricao: 'aaaaaaa@hotmail.com\n519999999',
      prioridade: enums.Prioridade.FAMILIA,
      status: enums.Status.CONHECIDOS,
      nome: 'Charles'
    },
    {
      id: 2,
      descricao: 'aaaaaaa@hotmail.com\n519999999',
      prioridade: enums.Prioridade.AMIGOS,
      status: enums.Status.FAVORITOS,
      nome: 'Bianca'
    },
    {
      id: 3,
      descricao: 'aaaaaaa@hotmail.com\n519999999',
      prioridade: enums.Prioridade.TRABALHO,
      status: enums.Status.CONHECIDOS,
      nome: 'Alexandre'
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (contato) => contato.id !== action.payload
      )
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDoContato = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]

        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; favorito: boolean }>
    ) => {
      const indexDoContato = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato].status = action.payload.favorito
          ? enums.Status.FAVORITOS
          : enums.Status.CONHECIDOS
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } =
  contatosSlice.actions

export default contatosSlice.reducer
