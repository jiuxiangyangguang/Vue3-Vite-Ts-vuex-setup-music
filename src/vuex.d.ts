import { CMT } from '@/store/store'

declare module 'vuex' {
  interface Commit {
    (type: CMT, payload?: any, options?: CommitOptions): void;
    <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
  }
}