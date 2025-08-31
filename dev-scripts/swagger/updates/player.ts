// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SwaggerJson = any

export function applyPlayerUpdates(swagger: SwaggerJson) {
  const schemas = swagger.components.schemas

  // fix BE not accepting undefined
  schemas.UpdatePlayerRequest.properties.phoneNumber.nullable = true
  schemas.CreatePlayerRequest.properties.phoneNumber.nullable = true

  return swagger
}
