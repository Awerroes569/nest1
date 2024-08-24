

model Order1 {
    id        String  @id @default(uuid())
    product   Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
    productId String?
    client    String
    address   String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }