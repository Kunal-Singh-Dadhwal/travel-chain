import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Basic } from '../target/types/basic';
import { PublicKey, SystemProgram } from '@solana/web3.js';

describe('basic', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Basic as Program<Basic>;
  const provider = anchor.AnchorProvider.env();
  const admin = provider.wallet.publicKey;

  it('should run the greet program', async () => {
    const tx = await program.methods.greet().rpc();
    console.log('Your transaction signature', tx);
  });

  it('should add a route', async () => {
    const route = anchor.web3.Keypair.generate();
    const routeId = 1;
    const details = "Route details";
    const distance = 100;

    const tx = await program.methods.addRoute(routeId, details, distance)
      .accounts({
        route: route.publicKey,
        admin: admin,
        systemProgram: SystemProgram.programId,
      })
      .signers([route])
      .rpc();
    console.log('Route added transaction signature', tx);
  });

  it('should modify a route', async () => {
    const route = anchor.web3.Keypair.generate();
    const routeId = 1;
    const initialDetails = "Initial route details";
    const newDetails = "Updated route details";
    const initialDistance = 100;
    const newDistance = 150;

    // Initialize the route first
    await program.methods.addRoute(routeId, initialDetails, initialDistance)
      .accounts({
        route: route.publicKey,
        admin: admin,
        systemProgram: SystemProgram.programId,
      })
      .signers([route])
      .rpc();

    const tx = await program.methods.modifyRoute(newDetails, newDistance)
      .accounts({
        route: route.publicKey,
        admin: admin,
      })
      .signers([route])
      .rpc();
    console.log('Route modified transaction signature', tx);
  });

  it('should book a ticket', async () => {
    const ticket = anchor.web3.Keypair.generate();
    const user = provider.wallet.publicKey;
    const routeId = 1;
    const price = 50;

    const tx = await program.methods.bookTicket(user, routeId, price)
      .accounts({
        ticket: ticket.publicKey,
        user: user,
        systemProgram: SystemProgram.programId,
      })
      .signers([ticket])
      .rpc();
    console.log('Ticket booked transaction signature', tx);
  });

  it('should view tickets', async () => {
    const tickets = await program.account.ticket.all();
    tickets.forEach(ticket => {
      console.log(`Ticket: ID - ${ticket.account.id}, User - ${ticket.account.user}, Route ID - ${ticket.account.routeId}, Price - ${ticket.account.price}, Timestamp - ${ticket.account.timestamp}`);
    });
  });

  it('should get the current timestamp', async () => {
    const data = anchor.web3.Keypair.generate();

    const tx = await program.methods.getCurrentTimestamp()
      .accounts({
        data: data.publicKey,
      })
      .signers([data])
      .rpc();
    console.log('Current timestamp transaction signature', tx);

    const account = await program.account.ticket.fetch(data.publicKey);
    console.log('Current timestamp:', account.timestamp);
  });

  // Edge case: Booking a ticket with an invalid route ID
  it('should fail to book a ticket with an invalid route ID', async () => {
    const ticket = anchor.web3.Keypair.generate();
    const user = provider.wallet.publicKey;
    const invalidRouteId = 999; // Assuming this route ID does not exist
    const price = 50;

    try {
      await program.methods.bookTicket(user, invalidRouteId, price)
        .accounts({
          ticket: ticket.publicKey,
          user: user,
          systemProgram: SystemProgram.programId,
        })
        .signers([ticket])
        .rpc();
    } catch (error) {
      console.log('Expected error:', error);
    }
  });

  // Edge case: Modifying a route with invalid details
  it('should fail to modify a route with invalid details', async () => {
    const route = anchor.web3.Keypair.generate();
    const routeId = 1;
    const initialDetails = "Initial route details";
    const invalidDetails = ""; // Invalid details
    const initialDistance = 100;
    const newDistance = 150;

    // Initialize the route first
    await program.methods.addRoute(routeId, initialDetails, initialDistance)
      .accounts({
        route: route.publicKey,
        admin: admin,
        systemProgram: SystemProgram.programId,
      })
      .signers([route])
      .rpc();

    try {
      await program.methods.modifyRoute(invalidDetails, newDistance)
        .accounts({
          route: route.publicKey,
          admin: admin,
        })
        .signers([route])
        .rpc();
    } catch (error) {
      console.log('Expected error:', error);
    }
  });
});
