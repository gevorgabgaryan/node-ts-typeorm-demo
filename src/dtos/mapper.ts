import { Mapper } from '@nartc/automapper'
import { Account } from '../typeorm/entity'
import { AccountResponseDto } from './account'

Mapper.createMap(Account, AccountResponseDto)