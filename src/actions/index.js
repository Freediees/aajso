
import { SET_USER, SET_EMAIL, SET_LOKASI, SET_ROLE, SET_TELP, SET_TABLE } from './actionTypes';

export const setUser = (data) => ({
  type: SET_USER,
  data
})

export const setEmail = (data) => ({
  type: SET_EMAIL,
  data
})

export const setTelp = (data) => ({
  type: SET_TELP,
  data
})

export const setLokasi = (data) => ({
  type: SET_LOKASI,
  data
})

export const setRole = (data) => ({
  type: SET_ROLE,
  data
})

export const setTable = (data) => ({
  type: SET_TABLE,
  data
})
