
import * as article from './module/article'
import * as comment from './module/comment'
import * as heros from './module/heros'
import * as link from './module/link'
import * as qn from './module/qn'
import * as tag from './module/tag'
import * as user from './module/user'
import * as book from './module/book'

export default {
  ...article,
  ...comment,
  ...heros,
  ...link,
  ...qn,
  ...tag,
  ...user,
  ...book
}
