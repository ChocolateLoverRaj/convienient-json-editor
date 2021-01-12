export interface NumberSchema {
  type: 'number'
}

export interface ObjectSchema {
  type: 'object'
  properties: {
    [name: string]: Schema
  }
  required?: string[]
}

export type Schema = NumberSchema | ObjectSchema

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
    props.onChange(parseInt(e.target.value))
  }} />
)

interface ObjectProps extends Props {
  schema: ObjectSchema
}
const ObjectEditor = (props: ObjectProps): JSX.Element => (
  <>
    <table>
      <tbody>
        {Object.entries(props.schema.properties).map(([name, schema], index) => (
          <tr key={index}>
            <th>{name}</th>
            <td>
              <Editor schema={schema} readOnly={props.readOnly} defaultValue={props.defaultValue?.[name]} value={props.value?.[name]} onChange={value => {
                props.onChange({
                  ...props.value,
                  [name]: value
                })
              }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)

const Editor = (props: Props): JSX.Element => {
  switch(props.schema.type) {
    case 'object':
      return <ObjectEditor {...props} />
    case 'number':
      return <NumberEditor {...props} />
  }
  
}

export default Editor
