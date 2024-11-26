import PocketBase from 'pocketbase'
import { env } from '$env/dynamic/public'

const pocketPath = env.PUBLIC_POCKET_PATH
export const pocket = new PocketBase(pocketPath)
export default pocket
