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
    const routeId = new anchor.BN(1);
    const details = "Route details";

    const tx = await program.methods.addRoute(routeId, details)
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
    const routeId = new anchor.BN(1);
    const newDetails = "Updated route details";

    // Initialize the route first
    await program.methods.addRoute(routeId, "Initial route details")
      .accounts({
        route: route.publicKey,
        admin: admin,
        systemProgram: SystemProgram.programId,
      })
      .signers([route])
      .rpc();

    const tx = await program.methods.modifyRoute(routeId, newDetails)
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
    const routeId = new anchor.BN(1);

    const tx = await program.methods.bookTicket(user, routeId)
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
      console.log(`Ticket: User - ${ticket.account.user}, Route ID - ${ticket.account.routeId}`);
    });
  });
});
