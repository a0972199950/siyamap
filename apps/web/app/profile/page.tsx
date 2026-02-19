// import { NextPage } from 'next'
// import { Button } from '@siyamap/ui'
// import { createUser } from './actions'
// import { db } from '@/db'
// import { users } from '@/db/schema'

// const PageProfile: NextPage = async () => {
//   // 在 Server Component 中直接讀取資料
//   const allUsers = await db.select().from(users)

//   return (
//     <>
//       <main className="p-8">
//         <h1 className="mb-4 text-2xl font-bold">使用者管理</h1>

//         {/* 新增使用者的表單 */}
//         <form
//           action={createUser}
//           className="mb-10 flex max-w-sm flex-col gap-4"
//         >
//           <input
//             name="username"
//             placeholder="使用者名稱"
//             className="rounded border p-2 text-black"
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="rounded border p-2 text-black"
//             required
//           />
//           <Button type="primary">新增使用者</Button>
//         </form>

//         {/* 顯示現有使用者清單 */}
//         <h2 className="mb-2 text-xl font-semibold">現有清單：</h2>
//         <ul className="list-disc pl-5">
//           {allUsers.map(user => (
//             <li key={user.id}>
//               {user.username} ({user.email}) - 建立於:{' '}
//               {user.createdAt?.toLocaleDateString()}
//             </li>
//           ))}
//         </ul>
//       </main>
//     </>
//   )
// }

// export default PageProfile
