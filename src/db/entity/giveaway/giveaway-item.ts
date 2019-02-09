import { IsFQDN, IsString } from 'class-validator'
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Giveaway } from '.'
import { GiveawayItemKey } from './giveaway-item-key'

@Entity()
export class GiveawayItem {
  /**
   * The giveaway the item is in.
   *
   * @type {Giveaway}
   * @memberof GiveawayItem
   */
  @ManyToOne(_ => Giveaway)
  public giveaway: Giveaway
  /**
   * The ID of the item. Auto-generated.
   *
   * @type {number}
   * @memberof GiveawayItem
   */
  @PrimaryGeneratedColumn()
  public id: number

  /**
   * The key object of the item.
   *
   * @type {GiveawayItemKey}
   * @memberof GiveawayItem
   */
  @OneToOne(_ => GiveawayItemKey, key => key.giveawayItem, {
    cascade: true
  })
  public key: GiveawayItemKey

  /**
   * The name of the item. Should be user-friendly.
   *
   * @type {string}
   * @memberof GiveawayItem
   */
  @Column('varchar')
  @IsString()
  public name: string

  /**
   * The URL of the item. Should be something like Steam link or store page.
   *
   * @type {string}
   * @memberof GiveawayItem
   */
  @Column('varchar')
  @IsFQDN()
  public url: string
}
