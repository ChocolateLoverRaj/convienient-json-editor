import styles from './index.module.scss'
import { useState } from 'react'
import { validate } from 'jsonschema'

export interface NumberSchema {
  type: 'number'
}

export interface StringSchema {
  type: 'string'
}

export interface ObjectSchema {
  type: 'object'
  properties: {
    [name: string]: Schema
  }
  required?: string[]
}

export type Schema = NumberSchema | StringSchema | ObjectSchema

interface Props {
  schema: Schema
  value?: any
  defaultValue?: any
  onChange?: (value: any) => unknown
  readOnly?: boolean
}

interface NumberProps extends Props {
  schema: NumberSchema
}
const NumberEditor = (props: NumberProps): JSX.Element => (
  <input type='number' readOnly={props.readOnly} defaultValue={props.defaultValue} value={props.value} onChange={e => {
    props.onChange?.(parseInt(e.target.value))
  }} />
)

interface StringProps extends Props {
  schema: StringSchema
}
const StringEditor = (props: StringProps): JSX.Element => (
  <input readOnly={props.readOnly} defaultValue={props.defaultValue} value={props.value} onChange={e => {
    props.onChange?.(e.target.value)
  }} />
)

interface ObjectProps extends Props {
  schema: ObjectSchema
}
const ObjectEditor = (props: ObjectProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <span 
              className={styles.arrow}
              onClick={() => {
                setCollapsed(!collapsed)
              }}
            >{collapsed
              ? '\u25BA'
              : '\u25BC'}
            </span>
            Object
          </th>
        </tr>
      </thead>
      <tbody>
        {!collapsed && Object.entries(props.schema.properties).map(([name, schema], index) => (
          <tr key={index}>
            <th>{name}</th>
            <td>
              <Editor schema={schema} readOnly={props.readOnly} defaultValue={props.defaultValue?.[name]} value={props.value?.[name]} onChange={value => {
                props.onChange?.({
                  ...props.value,
                  [name]: value
                })
              }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Editor = (props: Props): JSX.Element => {
  switch(props.schema.type) {
    case 'string':
      return <StringEditor {...props} schema={props.schema} />
    case 'number':
      props.schema
      return <NumberEditor {...props} schema={props.schema} />
    case 'object':
      return <ObjectEditor {...props} schema={props.schema} />
  }
  
}

export default Editor
