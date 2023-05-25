const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const [user1, user2, user3] = await ethers.getSigners();
    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example

    return { game, user1, user2, user3 };
  }

  it('should be a winner', async function () {
    const { game, user1, user2, user3 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(user1).buy({ value: '10' });

    await game.connect(user2).buy({ value: '20' });

    await game.connect(user3).buy({ value: '1' });

    // TODO: win expects three arguments
    await game.win(user1.getAddress(), user2.getAddress(), user3.getAddress());
    // console.log(await game.isWon());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
