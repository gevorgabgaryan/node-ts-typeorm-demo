import { Mapper } from '@nartc/automapper'
import { Account } from '../../typeorm/entity'
import { AccountResponseDto } from './accountResponse.dto'

export * from './accountResponse.dto'

Mapper.createMap(Account, AccountResponseDto)