import styles from './EachClient.module.css'

export default function EachClient() {
  return (
    <div className={styles.container}>
      <div className={styles.name}>My Name Is</div>
      <div className={styles.company}>ACME Studios</div>
      <div className={styles.tasks}>New Task</div>
      <div className={styles.email}>darkmanemail@gmail.com</div>
      <div className={styles.phone}>3109992182</div>
      <div className={styles.property}>28229 Main Street</div>
    </div>
  )
}