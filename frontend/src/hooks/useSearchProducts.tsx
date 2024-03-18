import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ISchema, schema } from 'src/utils/rules'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { IQueryConfig } from 'src/types/product.type'
import path from 'src/constants/path'

type IFormData = Pick<ISchema, 'name'>
const nameSchema = schema.pick(['name'])

const useSearchProducts = () => {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<IFormData>({
    resolver: yupResolver(nameSchema)
  })

  const handleSearch = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({
          ...queryConfig,
          name: data?.name
        } as IQueryConfig)
      ).toString()
    })
  })
  return { register, handleSearch }
}

export default useSearchProducts
