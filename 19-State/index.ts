class Order {
  private orderId: string;
  private customerName: string;
  private items: string[];
  private totalAmount: number;
  private state: OrderState;

  constructor(orderId: string, customerName: string, items: string[], totalAmount: number) {
    this.orderId = orderId;
    this.customerName = customerName;
    this.items = items;
    this.totalAmount = totalAmount;
    this.state = new PendingPaymentState(this);
  }

  public getOrderId(): string {
    return this.orderId;
  }

  public setOrderId(orderId: string): void {
    this.orderId = orderId;
  }

  public getCustomerName(): string {
    return this.customerName;
  }

  public setCustomerName(customerName: string): void {
    this.customerName = customerName;
  }

  public getItems(): string[] {
    return this.items;
  }

  public setItems(items: string[]): void {
    this.items = items;
  }

  public getTotalAmount(): number {
    return this.totalAmount;
  }

  public setTotalAmount(totalAmount: number): void {
    this.totalAmount = totalAmount;
  }

  public setState(state: OrderState): void {
    this.state = state;
  }

  public getCurrentStateName(): string {
    return this.state.stateName;
  }

  public verifyPayment(): void {
    this.state.verifyPayment();
  }

  public shipOrder(): void {
    this.state.shipOrder();
  }

  public cancelOrder(): void {
    this.state.cancelOrder();
  }

  public completeOrder(): void {
    this.state.completeOrder();
  }
}

abstract class OrderState {
  protected order: Order;
  public abstract readonly stateName: string; 

  constructor(order: Order) {
    this.order = order;
  }

  abstract verifyPayment(): void;
  abstract shipOrder(): void;
  abstract cancelOrder(): void;
  abstract deliverOrder(): void;
  abstract completeOrder(): void;
}

class PendingPaymentState extends OrderState {
  public readonly stateName: string;

  constructor(order: Order) {
    super(order);
    this.stateName = "รอชำระเงิน (Pending Payment)";
  }

  public verifyPayment(): void {
    console.log(`✅ ออเดอร์ [${this.order.getOrderId()}] ของคุณ ${this.order.getCustomerName()} ยอด ${this.order.getTotalAmount()} บาท ชำระเงินสำเร็จ! กำลังเปลี่ยนสถานะเป็น 'กำลังเตรียมจัดส่ง'`);
    this.order.setState(new ProcessingState(this.order));
  }

  public shipOrder(): void {
    console.log(`❌ ออเดอร์ [${this.order.getOrderId()}] จัดส่งไม่ได้: ลูกค้ายังไม่ได้ชำระเงิน`);
  }

  public cancelOrder(): void {
    console.log(`🛑 ยกเลิกออเดอร์ [${this.order.getOrderId()}] สำเร็จ (ไม่ต้องคืนเงิน เพราะยังไม่ได้จ่าย)`);
    this.order.setState(new PendingPaymentState(this.order));
  }

  public deliverOrder(): void {
    console.log(`❌ ออเดอร์ [${this.order.getOrderId()}] จัดส่งไม่ได้: ลูกค้ายังไม่ได้ชำระเงิน`);
  }

  public completeOrder(): void {
    console.log(`❌ ไม่สามารถทำรายการนี้ได้: ออเดอร์ [${this.order.getOrderId()}] ยังไม่ชำระเงิน`);
  }
}

class ProcessingState extends OrderState {
  public readonly stateName: string;

  constructor(order: Order) {
    super(order);
    this.stateName = "กำลังหาบริษัทขนส่ง (Processing)";
  }

  public verifyPayment(): void {
    console.log(`⚠️ ออเดอร์ [${this.order.getOrderId()}] นี้ชำระเงินไปแล้ว`);
  }

  public shipOrder(): void {
    console.log(`📦 ออเดอร์ [${this.order.getOrderId()}] ส่งมอบให้บริษัทขนส่งแล้ว! เปลี่ยนสถานะเป็น 'กำลังจัดส่ง'`);
    this.order.setState(new ShipState(this.order));
  }

  public cancelOrder(): void {
    console.log(`🛑 ยกเลิกออเดอร์ [${this.order.getOrderId()}] สำเร็จ! **กำลังทำเรื่องคืนเงิน ${this.order.getTotalAmount()} บาท** ให้ลูกค้า`);
    this.order.setState(new PendingPaymentState(this.order));
  }

  public deliverOrder(): void {
    console.log(`❌ ออเดอร์ [${this.order.getOrderId()}] กำลังเตรียมจัดส่ง ไม่สามารถทำรายการนี้ได้`);
  }

  public completeOrder(): void {
    console.log(`❌ ไม่สามารถทำรายการนี้ได้: ออเดอร์ [${this.order.getOrderId()}] ยังไม่ถูกจัดส่ง`);
  }
}

class ShipState extends OrderState {
  public readonly stateName: string;

  constructor(order: Order) {
    super(order);
    this.stateName = "กำลังจัดส่ง (Shipped)";
  }

  public verifyPayment(): void {
    console.log(`⚠️ ออเดอร์ [${this.order.getOrderId()}] นี้ชำระเงินไปแล้ว`);
  }

  public shipOrder(): void {
    console.log(`⚠️ ออเดอร์ [${this.order.getOrderId()}] นี้ถูกจัดส่งไปแล้ว`);
  }

  public cancelOrder(): void {
    console.log(`❌ ไม่สามารถยกเลิกได้: สินค้าอยู่ระหว่างการจัดส่ง กรุณาทำเรื่อง 'ขอคืนสินค้า' เมื่อได้รับของ`);
  }

  public deliverOrder(): void {
    console.log(`📦 ออเดอร์ [${this.order.getOrderId()}] กำลังจัดส่ง`);
    this.order.setState(new ShippedState(this.order));
  }

  public completeOrder(): void {
    console.log(`✅ ออเดอร์ [${this.order.getOrderId()}] กำลังเตรียมจัดส่ง!`);
  }
}

class ShippedState extends OrderState {
  public readonly stateName: string;

  constructor(order: Order) {
    super(order);
    this.stateName = "จัดส่งสำเร็จ (Success)";
  }

  public verifyPayment(): void {
    console.log(`⚠️ ออเดอร์ [${this.order.getOrderId()}] นี้ชำระเงินไปแล้ว`);
  }

  public shipOrder(): void {
    console.log(`⚠️ ออเดอร์ [${this.order.getOrderId()}] นี้ถูกจัดส่งไปแล้ว`);
  }

  public cancelOrder(): void {
    console.log(`❌ ไม่สามารถยกเลิกได้: สินค้าได้รับการจัดส่งเรียบร้อยแล้ว กรุณาทำเรื่อง 'ขอคืนสินค้า' หากต้องการคืน`);
  }

  public deliverOrder(): void {
    console.log(`📦 ออเดอร์ [${this.order.getOrderId()}] ถูกจัดส่งแล้ว`);
  }

  public completeOrder(): void {
    console.log(`✅ ออเดอร์ [${this.order.getOrderId()}] เสร็จสมบูรณ์แล้ว ขอบคุณที่ซื้อสินค้ากับเรา`);
  }
}

const myOrder = new Order("ORD-2024-001", "คุณสมชาย", ["คีย์บอร์ด", "เมาส์"], 3500);

console.log(`สถานะปัจจุบัน: ${myOrder.getCurrentStateName()}`);

console.log("\n--- ลูกค้าจ่ายเงิน ---");
myOrder.verifyPayment();

console.log("\n--- ร้านส่งของให้ขนส่ง ---");
myOrder.shipOrder();

console.log("\n--- ลูกค้ารับของเรียบร้อย ---");
myOrder.completeOrder();

const pendingOrder = new Order("ORD-2024-002", "คุณสมหญิง", ["หูฟัง"], 1500);

console.log(`\nสถานะปัจจุบัน: ${pendingOrder.getCurrentStateName()}`);

console.log("\n--- ลูกค้าจ่ายเงิน ---");
pendingOrder.verifyPayment();

console.log("\n--- ร้านส่งของให้ขนส่ง ---");
pendingOrder.shipOrder();

console.log("\n--- ลูกค้ายกเลิกออเดอร์ ---");
pendingOrder.cancelOrder();

console.log("\n--- ลูกค้ารับของเรียบร้อย ---");
pendingOrder.completeOrder();