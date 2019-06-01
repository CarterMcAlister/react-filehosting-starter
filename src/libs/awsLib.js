import { Storage, Auth } from 'aws-amplify'

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  })

  return stored.key
}

export const getCognitoIdentityId = async () => {
  const { attributes, pool } = await Auth.currentAuthenticatedUser()
  const userSubId = attributes.sub
  const userRegion = pool.userPoolId.split('_')[0]
  console.log(`${userRegion}:${userSubId}`)
  return `${userRegion}:${userSubId}`
}
